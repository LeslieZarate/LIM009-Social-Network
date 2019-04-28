// importamos la funcion que vamos a testear
import { myFunction } from "../src/view/index";

describe('myFunction', () => {
  it('debería ser una función', () => {
    expect(typeof myFunction).toBe('function');
  });
});
