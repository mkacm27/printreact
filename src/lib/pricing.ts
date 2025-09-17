interface CalculatePriceParams {
  printType: 'Recto' | 'Recto-verso' | 'Both';
  pages: number;
  rectoPages?: number;
  rectoVersoPages?: number;
  copies: number;
  settings: {
    priceRecto: number;
    priceRectoVerso: number;
    priceBoth: number;
  };
}

export const calculatePrice = ({
  printType,
  pages,
  rectoPages = 0,
  rectoVersoPages = 0,
  copies,
  settings,
}: CalculatePriceParams): number => {
  let totalPrice = 0;

  switch (printType) {
    case 'Recto':
      totalPrice = pages * settings.priceRecto;
      break;
    case 'Recto-verso':
      totalPrice = pages * settings.priceRectoVerso;
      break;
    case 'Both':
      totalPrice =
        rectoPages * settings.priceRecto +
        rectoVersoPages * settings.priceRectoVerso;
      break;
  }

  return totalPrice * copies;
};
