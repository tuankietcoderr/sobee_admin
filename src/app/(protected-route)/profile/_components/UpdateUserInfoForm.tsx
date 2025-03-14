'use client';

import {UpdateUserFormSchema, updateUserFormSchema} from '@/lib/form-schema';
import {IUser} from '@/lib/interfaces';
import {useUpdateUserMutation} from '@/services/user';
import {zodResolver} from '@hookform/resolvers/zod';
import {Button, Input} from '@nextui-org/react';
import {format} from 'date-fns';
import {Check, RotateCcw} from 'lucide-react';
import {useForm} from 'react-hook-form';
import toast from 'react-hot-toast';

type Props = {
  userInfo: IUser;
};

const UpdateUserInfoForm = ({userInfo}: Props) => {
  const {
    register,
    watch,
    formState: {errors},
    setValue,
    handleSubmit,
    reset,
  } = useForm<UpdateUserFormSchema>({
    resolver: zodResolver(updateUserFormSchema),
    defaultValues: {
      dateOfBirth: userInfo?.dateOfBirth,
      email: userInfo?.email || '',
      name: userInfo?.name || '',
      phoneNumber: userInfo?.phoneNumber || '',
    },
  });

  const updateUserMutation = useUpdateUserMutation();

  const isLoading = updateUserMutation.isPending;

  const onReset = () => {
    reset({
      dateOfBirth: userInfo?.dateOfBirth,
      email: userInfo?.email || '',
      name: userInfo?.name || '',
      phoneNumber: userInfo?.phoneNumber || '',
    });
  };
  const onUpdate = (data: UpdateUserFormSchema) => {
    updateUserMutation.mutate(data, {
      onSuccess: data => {
        if (data.success) {
          toast.success('User information updated successfully');
        } else {
          toast.error(data.message);
        }
      },
      onError: (error: any) => {
        toast.error(
          error?.response?.data?.message || 'Failed to update user information',
        );
      },
    });
  };

  return (
    <div className="h-fit space-y-2 rounded-md bg-background p-4 shadow-custom-light">
      <h2 className="text-2xl font-bold">Update user information</h2>
      <form className="space-y-3" onSubmit={handleSubmit(onUpdate)}>
        <Input
          {...register('name')}
          label="Name"
          placeholder="So Van Bee"
          variant="bordered"
          value={watch('name')}
          isInvalid={!!errors.name}
          errorMessage={errors.name?.message}
        />
        <Input
          {...register('email')}
          label="Email"
          placeholder="example@host.com"
          variant="bordered"
          value={watch('email')}
          isInvalid={!!errors.email}
          errorMessage={errors.email?.message}
        />
        <Input
          {...register('phoneNumber')}
          label="Phone number"
          placeholder="0123456789"
          variant="bordered"
          value={watch('phoneNumber')}
          isInvalid={!!errors.phoneNumber}
          errorMessage={errors.phoneNumber?.message}
        />
        <Input
          {...register('dateOfBirth')}
          label="Date of birth"
          type="date"
          variant="bordered"
          isInvalid={!!errors.dateOfBirth}
          errorMessage={errors.dateOfBirth?.message}
          value={format(watch('dateOfBirth') || new Date(), 'yyyy-MM-dd')}
        />
        <div className="flex gap-2">
          <Button
            variant="solid"
            color="primary"
            startContent={<Check size={18} />}
            type="submit"
            isLoading={isLoading}
            isDisabled={isLoading}>
            Update
          </Button>
          <Button
            variant="light"
            color="default"
            startContent={<RotateCcw size={18} />}
            type="reset"
            onClick={onReset}>
            Reset
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UpdateUserInfoForm;
