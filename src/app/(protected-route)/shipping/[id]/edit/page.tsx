import {APP_ROUTES} from '@/constants';
import {ParamsProps} from '@/lib/params';
import {fetchShippingByIdAction} from '@/services/shipping';
import {Divider} from '@nextui-org/react';
import {ChevronLeft} from 'lucide-react';
import Link from 'next/link';
import {ShippingForm} from '../../_components';

const page = async ({params}: ParamsProps) => {
  const id = params.id;
  const res = await fetchShippingByIdAction(id);
  const data = res.data!;

  return (
    <div className="space-y-6">
      <div className="mt-4 flex items-center gap-8">
        <Link href={APP_ROUTES.SHIPPINGS.INDEX} className="p-2">
          <ChevronLeft className="text-slate-500" />
        </Link>
        <h1 className="text-2xl font-semibold">
          Update Shipping <span className="text-primary">{data.name}</span>
        </h1>
      </div>
      <Divider />
      <ShippingForm data={res.data} type="edit" />
    </div>
  );
};

export default page;
