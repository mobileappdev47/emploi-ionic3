import { FilterModule, IFilterBarItems } from './filter.module';
import { FilterBar } from './filter.bar';

export interface IFilter {
    search?: string;
    [key: string]: any;
}

export { FilterModule, FilterBar, IFilterBarItems };
