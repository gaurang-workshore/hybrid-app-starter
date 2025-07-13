// src/types.d.ts
/// <reference types="react" />

declare namespace React {
    interface ElementRef<T extends React.ElementType> {
      current: React.ComponentRef<T> | null;
    }
    
    type ComponentPropsWithoutRef<T extends React.ElementType> = 
      React.PropsWithoutRef<React.ComponentProps<T>>;
  }