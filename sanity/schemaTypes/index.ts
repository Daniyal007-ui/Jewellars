import { type SchemaTypeDefinition } from 'sanity'
import product from './product'   
import banner from './banner'
import footer from './footer'


export const schema: { types: SchemaTypeDefinition[] } = {
  types: [ product, banner, footer],
}
