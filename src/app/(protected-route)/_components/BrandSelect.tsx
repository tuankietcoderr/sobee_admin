'use client';

import {DEFAULT_IMAGE} from '@/constants';
import {IBrand} from '@/lib/interfaces';
import {Avatar, Select, SelectItem, SelectProps} from '@nextui-org/react';
import {forwardRef} from 'react';

type BrandSelectProps = {
  brandList: IBrand[];
} & Omit<SelectProps, 'items' | 'renderValue' | 'children'>;

// eslint-disable-next-line react/display-name
const BrandSelect = forwardRef<HTMLSelectElement, BrandSelectProps>(
  ({brandList, ...props}, ref) => {
    const RenderBrand = (brand: IBrand) => (
      <div className="flex items-center gap-2">
        <Avatar
          src={brand.logo}
          size="sm"
          showFallback
          fallback={DEFAULT_IMAGE}
        />
        <div className="flex-1 space-y-1">
          <p className="text-foreground">{brand.name}</p>
        </div>
      </div>
    );

    return (
      <Select
        ref={ref}
        items={brandList}
        selectionMode="single"
        disallowEmptySelection
        label="Brand"
        placeholder="Select brand"
        renderValue={items =>
          items.map(item => (
            <RenderBrand {...item.data!} key={item.data?._id} />
          ))
        }
        {...props}>
        {brand => (
          <SelectItem key={brand._id!} value={brand._id}>
            <RenderBrand {...brand} />
          </SelectItem>
        )}
      </Select>
    );
  },
);

export default BrandSelect;
