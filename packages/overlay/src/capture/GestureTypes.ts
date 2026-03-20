export type GestureType = 'dwell' | 'circle' | 'path';

export interface Gesture {
  type: GestureType;
  startTime: number;
  endTime: number;
  elements: GestureElement[];
  region?: { x: number; y: number; width: number; height: number };
}

export interface GestureElement {
  tagName: string;
  selector: string;
  domSnippet: string;
  role: 'source' | 'target' | 'encircled';
}

export interface GestureContext {
  gestures: Gesture[];
  summary: string;
}
