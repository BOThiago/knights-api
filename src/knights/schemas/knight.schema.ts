import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type KnightDocument = Knight & Document;

export class Weapon {
  @ApiProperty()
  name: string;

  @ApiProperty()
  mod: number;

  @ApiProperty()
  attr: string;

  @ApiProperty()
  equipped: boolean;
}

export class Attributes {
  @ApiProperty()
  strength: number;

  @ApiProperty()
  dexterity: number;

  @ApiProperty()
  constitution: number;

  @ApiProperty()
  intelligence: number;

  @ApiProperty()
  wisdom: number;

  @ApiProperty()
  charisma: number;
}

@Schema()
export class Knight {
  @ApiProperty()
  @Prop({ required: true })
  name: string;

  @ApiProperty()
  @Prop({ required: true })
  nickname: string;

  @ApiProperty()
  @Prop({ required: true })
  birthday: Date;

  @ApiProperty({
    type: [Weapon],
  })
  weapons: Weapon[];

  @ApiProperty({
    type: Attributes,
  })
  attributes: Attributes;

  @ApiProperty()
  @Prop({ required: true })
  keyAttribute: string;

  @ApiProperty()
  @Prop({ default: false })
  isHero: boolean;
}

export const KnightSchema = SchemaFactory.createForClass(Knight);
