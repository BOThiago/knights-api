import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Knight, KnightDocument } from './schemas/knight.schema';

@Injectable()
export class KnightsService {
  constructor(
    @InjectModel(Knight.name) private knightModel: Model<KnightDocument>,
  ) {}

  private calculateAttrMod(value: number): number {
    if (value >= 0 && value <= 8) return -2;
    if (value <= 10) return -1;
    if (value <= 12) return 0;
    if (value <= 15) return 1;
    if (value <= 18) return 2;
    if (value <= 20) return 3;
  }

  private calculateAttack(knight: Knight): number {
    const keyAttrValue = knight.attributes[knight.keyAttribute];

    if (keyAttrValue === undefined || keyAttrValue === null) {
      throw new BadRequestException(
        'Key attribute value is required for attack calculation',
      );
    }

    const keyAttrMod = this.calculateAttrMod(keyAttrValue);

    const equippedWeapon = knight.weapons.find((w) => w.equipped) || {
      mod: 0,
    };

    return 10 + keyAttrMod + equippedWeapon.mod;
  }

  private calculateAge(birthday: Date): number {
    if (!birthday) {
      throw new BadRequestException('Birthday is required for age calculation');
    }

    const ageDiff = Date.now() - birthday.getTime();
    return Math.floor(ageDiff / (1000 * 60 * 60 * 24 * 365.25));
  }

  private calculateExpOfCombat(age: number): number {
    return age < 7 ? 0 : Math.floor((age - 7) * Math.pow(22, 1.45));
  }

  /**
   * Cria um novo cavaleiro
   * @param knightData Dados do cavaleiro
   * @returns O cavaleiro criado
   */
  async createKnight(knightData: Partial<Knight>): Promise<Knight> {
    if (!knightData || Object.keys(knightData).length === 0) {
      throw new BadRequestException('Knight data is required');
    }

    const { attributes } = knightData;
    if (attributes) {
      const {
        strength,
        dexterity,
        constitution,
        intelligence,
        wisdom,
        charisma,
      } = attributes;
      const invalidAttributes = Object.entries({
        strength,
        dexterity,
        constitution,
        intelligence,
        wisdom,
        charisma,
      })
        .filter(([_, value]) => value < 0 || value > 20)
        .map(([key]) => key);
      if (invalidAttributes.length > 0) {
        throw new BadRequestException(
          `Attributes ${invalidAttributes.join(', ')} must be between 0 and 20`,
        );
      }
    } else {
      throw new BadRequestException('Attributes are required');
    }

    try {
      return await new this.knightModel(knightData).save();
    } catch (error) {
      throw new BadRequestException('Error creating knight');
    }
  }

  /**
   * Encontra todos os cavaleiros com base no filtro
   * @param filter Filtro para heróis
   * @returns Lista de cavaleiros
   */
  async findAll(filter?: string): Promise<any[]> {
    let query = filter === 'heroes' ? { isHero: true } : { isHero: false };

    try {
      const knights = await this.knightModel.find(query).lean();
      return knights.map((k) => {
        const age = this.calculateAge(new Date(k.birthday));
        return {
          ...k,
          age,
          attack: this.calculateAttack(k),
          exp: this.calculateExpOfCombat(age),
        };
      });
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Error retrieving knights');
    }
  }

  /**
   * Encontra um cavaleiro pelo ID
   * @param id ID do cavaleiro
   * @returns Detalhes do cavaleiro
   */
  async findOne(id: string): Promise<any> {
    if (!id) {
      throw new BadRequestException('Knight ID is required');
    }

    try {
      const knight = await this.knightModel.findById(id).lean();

      if (!knight) {
        throw new NotFoundException(`Knight ${id} not found`);
      }

      const age = this.calculateAge(knight.birthday);
      return {
        ...knight,
        age,
        attack: this.calculateAttack(knight as Knight),
        exp: this.calculateExpOfCombat(age),
      };
    } catch (error) {
      throw new BadRequestException(`Error finding knight with ID ${id}`);
    }
  }

  async updateNickname(id: string, newNickname: string): Promise<Knight> {
    if (!id || !newNickname) {
      throw new BadRequestException('Knight ID and new nickname are required');
    }

    try {
      const knight = await this.knightModel.findByIdAndUpdate(
        id,
        { nickname: newNickname },
        { new: true },
      );
      if (!knight) {
        throw new NotFoundException(`Knight ${id} not found`);
      }
      return knight;
    } catch (error) {
      throw new BadRequestException(`Error updating nickname for knight ${id}`);
    }
  }

  async remove(id: string): Promise<void> {
    if (!id) {
      throw new BadRequestException('Knight ID is required');
    }

    try {
      const knight = await this.knightModel.findById(id);
      if (!knight) {
        throw new NotFoundException(`Knight ${id} not found`);
      }
      knight.isHero = true;
      await knight.save();
    } catch (error) {
      throw new BadRequestException(`Error removing knight ${id}`);
    }
  }
}
