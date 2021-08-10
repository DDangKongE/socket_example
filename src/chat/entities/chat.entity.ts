import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'chat_data' })
export class ChatEntity {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int', comment: 'id' })
  id: number;

  @Column({ name: 'message', type: 'string', length: 5000, comment: '메세지' })
  message: string;

  @Column({
    name: 'create_at',
    type: 'datetime',
    default: 'current_timestamp()',
  })
  create_at: Date;
}
