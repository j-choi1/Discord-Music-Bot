import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Index
} from 'typeorm';
import { Guild } from './guild';

@Entity()
export class Queue {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: false })
  youtubeId!: string;

  @ManyToOne((type) => Guild, (guild) => guild.queues)
  @Index()
  guild!: Guild;

  @Column({ nullable: false })
  title!: string;

  @Column({ nullable: false })
  duration!: string;

  @Column({ nullable: false })
  position!: number;
}
