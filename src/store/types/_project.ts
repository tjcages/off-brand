type ProjectProps = {
  id?: string;
  name: string;
  type: string;
  description: string;
  cover: string;
  preview: string;
  x?: number;
  y?: number;
  z?: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  texture?: any;
  width?: number;
  height?: number;
  ratio?: number;
  href?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ref?: any;
  size?: {
    width: number;
    height: number;
  };
  content:
    | {
        type: string;
        src: string;
      }[]
    | null;
};

export type { ProjectProps };
