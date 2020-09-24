import { Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Queue } from './queue';

@Entity()
export class Guild {
  @PrimaryColumn()
  id!: string;

  @OneToMany((type) => Queue, (queue) => queue.guild, { eager: true })
  queues!: Queue[];
}
