import { Category } from './categories.entity';
import { CATEGORY_REPOSITORY } from 'src/common/constants';

export const categoriesProviders = [
  {
    provide: CATEGORY_REPOSITORY,
    useValue: Category,
  },
];
