import { ElectionData } from './election-data';

export interface Election {
  id: number;
  electionType: string;
  status: boolean;
  results: any[];
}
