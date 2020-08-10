export interface ProfileDialogData {
  for: string;
  name: string;
  nickname: string;
  course: string;
  image: string;
  level: number;
  bio: string;
}

export interface VoteCastingDialogData {
  for: string;
  electionID: string;
  electionType: string;
  candidateID: string;
  candidateName: string;
}
