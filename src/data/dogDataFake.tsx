interface DogData {
  dogName: string;
  svgLink: string;
  startX: number;
  startY: number;
}

// eslint-disable-next-line import/prefer-default-export
export const dogDataFake: DogData[] = [
  {
    dogName: 'First',
    svgLink: '/link',
    startX: 10,
    startY: 10,
  },
  {
    dogName: 'Second',
    svgLink: '/link',
    startX: 10,
    startY: 10,
  },
];
