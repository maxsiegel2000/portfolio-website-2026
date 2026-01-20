import { type SchemaTypeDefinition } from 'sanity'
import profile from './profile'
import projects from './projects'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    profile,
    projects
  ],
}
