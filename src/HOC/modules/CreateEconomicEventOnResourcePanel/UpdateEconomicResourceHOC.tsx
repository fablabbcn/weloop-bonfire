import { useFormik } from 'formik';
import React, { FC } from 'react';
import { Slide, toast } from 'react-toastify';
import {
  UpdateResourcePanel,
  TUpdateResourcePanel,
  UpdateResourceVariables
} from '../../../ui/modules/UpdateResourcePanel';
import * as Yup from 'yup';
import { TestUrlOrFile } from 'HOC/lib/formik-validations';
import { useUpdateResource } from '../../../fe/resource/update/useUpdateResource';
import { EconomicResource } from '../../pages/inventory/InventoryPage';
import * as GQL from '../EconomicEventManager/EconomicEventManager.generated';

export const validationSchema: Yup.ObjectSchema<UpdateResourceVariables> = Yup.object<
  UpdateResourceVariables
>({
  name: Yup.string()
    .min(2)
    .max(60)
    .required(),
  note: Yup.string().max(500),
  image: Yup.mixed<string | File>().test(...TestUrlOrFile)
});

export interface Props {
  done: () => void;
  resource: EconomicResource;
}

export const UpdateEconomicResourceHOC: FC<Props> = ({ done, resource, ...props }) => {
  const { update } = useUpdateResource();

  const SignupSchema = Yup.object().shape({
    note: Yup.string().max(500, 'Too Long!')
  });
  const spatialThingsQ = GQL.useSpatialThingsPagesQuery();
  const spatialThings = spatialThingsQ.data?.spatialThingsPages;

  const formik = useFormik<any>({
    initialValues: React.useMemo(() => {
      let values = {
        note: '',
        image: '' || undefined,
        location: ''
      };
      if (resource) {
        values = {
          name: resource.name || '',
          note: resource.note || '',
          //@ts-ignore
          image: resource.image || undefined,
          atLocation: resource.currentLocation
            ? {
                id: resource.currentLocation.id,
                value: resource.currentLocation.id,
                label: resource.currentLocation.name
              }
            : { id: '', label: '', value: '' }
        };
      }
      return values;
    }, [resource]),
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: SignupSchema,
    enableReinitialize: true,

    onSubmit: (values: UpdateResourceVariables) => {
      return update({
        id: resource.id,
        name: values.name,
        note: values.note,
        atLocation: values.atLocation?.id,
        image: values.image
      })
        .then((response: any) => {
          !response.errors &&
            toast.success(`Resource was updated`, {
              position: 'top-right',
              transition: Slide,
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true
            });
          done();
        })
        .catch((error: any) => {
          toast.error(error.message, {
            position: 'top-right',
            transition: Slide,
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true
          });
        });
    }
  });

  const UpdateResourcePanelProps: TUpdateResourcePanel = {
    ...props,
    spatialThings: spatialThings?.edges,
    title: `Update resource ${resource.name}`,
    formik,
    done
  };

  return <UpdateResourcePanel {...UpdateResourcePanelProps} />;
};
