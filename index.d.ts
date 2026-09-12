declare function generateName(options?: generateName.TamilOptions): string;
declare function generateName(options: generateName.BothOptions): generateName.DetailedName;
/** 0.x signature: a bare random generator. */
declare function generateName(random: () => number): string;

declare namespace generateName {
  type NounKind = 'creature' | 'plant' | 'thing' | 'place';
  type JoinClass = 'nasal' | 'double' | 'ran' | 'plain' | 'phrase';
  type Format = 'tamil' | 'latin' | 'both';
  type Style = 'plain' | 'camel' | 'snake' | 'kebab';

  interface Adjective {
    word: string;
    stem: string;
    join: JoinClass;
    gloss: string;
    modifies: NounKind[];
  }

  interface Noun {
    word: string;
    kind: NounKind;
    gloss: string;
  }

  interface DetailedName {
    tamil: string;
    latin: string;
    gloss: string;
  }

  interface Options {
    /** Returns a float in [0, 1). Defaults to Math.random. */
    random?: () => number;
    format?: Format;
    style?: Style;
    kind?: NounKind;
  }

  interface TamilOptions extends Options {
    format?: 'tamil' | 'latin';
  }

  interface BothOptions extends Options {
    format: 'both';
  }

  function many(count: number, options?: TamilOptions): string[];
  function many(count: number, options: BothOptions): DetailedName[];
  /** Distinct modifier + noun pairings the current word lists allow. */
  function combinations(): number;
  function randomNoun(random?: () => number): string;
  function randomAdjective(random?: () => number): string;
  function romanize(word: string): string;
  function join(stem: string, joinClass: JoinClass, noun: string): string;

  const adjectives: Adjective[];
  const nouns: Noun[];
}

export = generateName;
