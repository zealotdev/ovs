export const RESULTS = [
  {
    data: [345],
    label: 'Jorge D.',
  },
  {
    data: [200],
    label: 'Foo B.',
  },
  {
    data: [234],
    label: 'Mike T.',
  },
  {
    data: [239],
    label: 'Abraham L.',
  },
  {
    data: [134],
    label: 'Martin L.',
  },
  {
    data: [201],
    label: 'Depp J.',
  },
];

export const ELECTIONS = [
  {
    id: 1,
    electionType: 'president',
    active: true,
    startTime: new Date().getHours(),
    candidates: [
      {
        id: 1,
        name: 'Jorge D.',
        bio: 'Amazing coder',
        votes: 345,
      },
      {
        id: 2,
        name: 'Mark Twain',
        bio: 'The Philosopher',
        votes: 125,
      },
      {
        id: 3,
        name: 'John Doe',
        bio: 'No body cares who he is',
        votes: 230,
      },
      {
        id: 4,
        name: 'Foo Bar',
        bio: 'What is this',
        votes: 300,
      },
    ],
  },
  {
    id: 2,
    electionType: 'women representative',
    active: true,
    startTime: new Date().getHours(),
    candidates: [
      {
        id: 1,
        name: 'Vicky V',
        bio: 'Ambitious lady',
        votes: 120,
      },
      {
        id: 2,
        name: 'Mary J',
        bio: 'The militia',
        votes: 85,
      },
      {
        id: 3,
        name: 'Sabby T',
        bio: 'The Ustadhat',
        votes: 98,
      },
    ],
  },
  {
    id: 3,
    electionType: 'speaker',
    active: true,
    startTime: new Date().getHours(),
    candidates: [
      {
        id: 1,
        name: 'Jere J.',
        bio: 'You go the CR',
        votes: 13,
      },
      {
        id: 2,
        name: 'Aziz',
        bio: 'The blur monster',
        votes: 23,
      },
      {
        id: 3,
        name: 'Vicky V.',
        bio: 'Ambitious lady',
        votes: 24,
      },
    ],
  },
  {
    id: 4,
    electionType: 'class representative',
    active: true,
    startTime: new Date().getHours(),
    candidates: [
      {
        id: 1,
        name: 'Jere J.',
        bio: 'Here go the CR',
        votes: 23,
      },
      {
        id: 2,
        name: 'Aziz',
        bio: 'The blur monster',
        votes: 19,
      },
      {
        id: 3,
        name: 'Vicky V.',
        bio: 'Ambitious lady',
        votes: 30,
      },
    ],
  },
];
