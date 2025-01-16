import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type KnightDocument = Knight & Document;

@Schema()
export class Knight {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  nickname: string;

  @Prop({ required: true })
  birthday: Date;

  @Prop({
    type: [
      {
        name: String,
        mod: Number,
        attr: String,
        equipped: Boolean,
      },
    ],
  })
  weapons: {
    name: string;
    mod: number;
    attr: string;
    equipped: boolean;
  }[];

  @Prop({
    type: {
      strength: Number,
      dexterity: Number,
      constitution: Number,
      intelligence: Number,
      wisdom: Number,
      charisma: Number,
    },
  })
  attributes: {
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
  };

  @Prop({ required: true })
  keyAttribute: string;

  @Prop({ default: false })
  isHero: boolean;
}

export const KnightSchema = SchemaFactory.createForClass(Knight);
