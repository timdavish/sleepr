import { AbstractDocument } from '@app/common/database';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  versionKey: false,
})
export class ReservationDocument extends AbstractDocument {
  @Prop()
  endDate: Date;

  @Prop()
  invoiceId: string;

  @Prop()
  startDate: Date;

  @Prop()
  timestamp: Date;

  @Prop()
  userId: string;
}

export const ReservationSchema =
  SchemaFactory.createForClass(ReservationDocument);
