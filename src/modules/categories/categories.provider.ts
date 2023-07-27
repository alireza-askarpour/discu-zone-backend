import { Category } from './categories.entity';
import { CATEGORY_REPOSITORY } from 'src/core/constants';

export const categoriesProviders = [
  {
    provide: CATEGORY_REPOSITORY,
    useValue: Category,
  },
];
