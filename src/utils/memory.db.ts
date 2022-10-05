import { Injectable } from '@nestjs/common';

@Injectable()
export class MemoryDB {
  private storage = new Map();

  public get(key: string) {
    return this.storage.get(key);
  }

  public set(key: string, data: any) {
    this.storage.set(key, data);
  }
}
