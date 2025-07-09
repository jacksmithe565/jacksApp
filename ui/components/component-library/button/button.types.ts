import type { PolymorphicComponentPropWithRef } from '../box';
import type { ButtonPrimaryStyleUtilityProps } from '../button-primary/button-primary.types';
import type { ButtonSecondaryStyleUtilityProps } from '../button-secondary/button-secondary.types';
import type { ButtonLinkStyleUtilityProps } from '../button-link/button-link.types';

export enum ButtonSize {
  Sm = 'sm',
  Md = 'md',
  Lg = 'lg',
  Inherit = 'inherit',
  Auto = 'auto',
}

export enum ButtonVariant {
  Primary = 'primary',
  Secondary = 'secondary',
  Link = 'link',
}

type ValidButtonSize = Exclude<ButtonSize, ButtonSize.Inherit | ButtonSize.Auto>;

type ButtonPropsByVariant = {
  [ButtonVariant.Primary]: {
    variant?: ButtonVariant.Primary;
    size?: ValidButtonSize;
  } & Omit<ButtonPrimaryStyleUtilityProps, 'size' | 'variant'>;
  
  [ButtonVariant.Secondary]: {
    variant?: ButtonVariant.Secondary;
    size?: ValidButtonSize;
  } & Omit<ButtonSecondaryStyleUtilityProps, 'size' | 'variant'>;

  [ButtonVariant.Link]: {
    variant?: ButtonVariant.Link;
    size?: ButtonSize;
  } & Omit<ButtonLinkStyleUtilityProps, 'size' | 'variant'>;
};

type ButtonPropsMap = Record<ButtonVariant, any> & {
   [K in keyof typeof ButtonVariants]: K extends keyof typeof buttonPropsByVariants ? buttonPropsByVariants[K] : never
} extends infer O ? {[K in keyof O]:O[K]} : never;

export type ButtonProps<C extends React.ElementType> =
   PolymorphicComponentPropWithRef<C, 
     Partial<
       (ButtonPropsByVariant[ButtonVariant.Primary] |
        ButtonPropsByVariant[ButtonVariant.Secondary] |
        ButtonPropsByVariant[ButtonVariant.Link])
     >
   >;

export type ButtonComponent = <C extends React.ElementType= "button" | "a">(
   props:	ButtonProps<C>
) => React.ReactElement | null;
