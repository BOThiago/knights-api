import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Knight, KnightDocument } from './schemas/knight.schema';

@Injectable()
export class KnightsService {
  constructor(
    @InjectModel(Knight.name) private knightModel: Model<KnightDocument>,
  ) {}

  private calculateAttrMod(value: number): number {
    switch (true) {
      case value <= 8:
        return -2;
      case value >= 9 && value <= 10:
        return -1;
      case value >= 11 && value <= 12:
        return 0;
      case value >= 13 && value <= 15:
        return 1;
      case value >= 16 && value <= 18:
        return 2;
      case value >= 19 && value <= 20:
        return 3;
      default:
        return undefined;
    }
  }

  private calculateAttack(knight: Knight): number {
    const keyAttrValue = knight.attributes[knight.keyAttribute];
    const keyAttrMod = this.calculateAttrMod(keyAttrValue);

    const equippedWeapon = knight.weapons.find((w) => w.equipped) || {
      mod: 0,
    };

    return 10 + keyAttrMod + equippedWeapon.mod;
  }

  private calculateAge(birthday: Date): number {
    const ageDiff = Date.now() - birthday.getTime();
    const ageDate = new Date(ageDiff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  private calculateExpOfCombat(age: number): number {
    if (age < 7) return 0;
    return Math.floor((age - 7) * Math.pow(22, 1.45));
  }

  async createKnight(knightData: Partial<Knight>): Promise<Knight> {
    const knightCreated = await new this.knightModel(knightData).save();
    return knightCreated;
  }

  async findAll(filter?: string): Promise<any[]> {
    let query = {};

    if (filter === 'heroes') {
      query = { isHero: true };
    } else {
      query = { isHero: false };
    }

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
  }

  async findOne(id: string): Promise<any> {
    const knight = await this.knightModel.findById(id).lean();
    if (!knight) {
      throw new NotFoundException(`Knight ${id} não encontrado`);
    }

    const age = this.calculateAge(knight.birthday);
    return {
      ...knight,
      age,
      attack: this.calculateAttack(knight as Knight),
      exp: this.calculateExpOfCombat(age),
    };
  }

  async updateNickname(id: string, newNickname: string): Promise<Knight> {
    const knight = await this.knightModel.findByIdAndUpdate(
      id,
      { nickname: newNickname },
      { new: true },
    );
    if (!knight) {
      throw new NotFoundException(`Knight ${id} não encontrado`);
    }
    return knight;
  }

  async remove(id: string): Promise<void> {
    const knight = await this.knightModel.findById(id);
    if (!knight) {
      throw new NotFoundException(`Knight ${id} não encontrado`);
    }
    knight.isHero = true;
    await knight.save();
  }
}
