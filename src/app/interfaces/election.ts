import { Result } from './result';

export interface Election {
  id: number;
  electionType: string;
  status: boolean;
  results: any[];
}
