import React from 'react';
import {
  List,
  Filter,
  Datagrid,
  TextField,
  ReferenceField,
  ReferenceManyField,
  Pagination,
  ImageField,
  DateField,
  Show,
  TabbedShowLayout,
  Tab,
  Create,
  Edit,
  SimpleForm,
  TabbedForm,
  FormTab,
  DisabledInput,
  TextInput,
  ReferenceInput,
  AutocompleteInput,
  DateTimeInput,
  ShowButton,
  EditButton,
} from 'react-admin';
import CreateRelatedButton from './CreateRelatedButton';

import { AlbumReferenceField, AlbumReferenceInput } from './albums';
import { CommentReferenceManyField } from './comments';

/** Photo icon */
import PhotoIcon from '@material-ui/icons/Photo';
export { PhotoIcon };

/** Photo reference field */
export const PhotoReferenceField = props => (
  <ReferenceField reference="photos" allowEmpty {...props}>
    <TextField source="title" />
  </ReferenceField>
);
PhotoReferenceField.defaultProps = {
  addLabel: true,
};

/** Photo reference input. */
export const PhotoReferenceInput = props => (
  <ReferenceInput reference="photos" allowEmpty {...props}>
    <AutocompleteInput
      optionText="title"
      shouldRenderSuggestions={val => {
        return val.trim().length > 2;
      }}
    />
  </ReferenceInput>
);

/** Photo reference list */
export const PhotoReferenceManyField = props => (
  <ReferenceManyField
    pagination={<Pagination />}
    perPage={10}
    reference="photos"
    {...props}
  >
    <Datagrid data-testid="photo-reference-list">
      <TextField source="id" />
      {props.target !== 'album_id' && <AlbumReferenceField source="album_id" />}
      <TextField source="title" />
      <ImageField source="url" />
      <DateField source="date" showTime={true} />
      <TextField source="description" />
      <ShowButton />
      <EditButton />
    </Datagrid>
  </ReferenceManyField>
);

/** Photo list filters */
const PhotoFilters = props => (
  <Filter {...props}>
    <TextInput label="Search" source="q" alwaysOn />
    <AlbumReferenceInput source="album_id" />
  </Filter>
);

/** Photo list view */
export const PhotoList = props => (
  <List filters={<PhotoFilters />} {...props}>
    <Datagrid>
      <TextField source="id" />
      <AlbumReferenceField source="album_id" />
      <TextField source="title" />
      <ImageField source="url" />
      <DateField source="date" showTime={true} />
      <TextField source="description" />
      <ShowButton />
      <EditButton />
    </Datagrid>
  </List>
);

/** Photo show view */
export const PhotoShow = props => (
  <Show {...props}>
    <TabbedShowLayout>
      <Tab label="Summary">
        <TextField source="id" />
        <AlbumReferenceField source="album_id" />
        <TextField source="title" />
        <ImageField source="url" />
        <DateField source="date" showTime={true} />
        <TextField source="description" />
      </Tab>
      <Tab label="Comments" path="comments">
        <CreateRelatedButton target="photo_id" related="comments" />
        <CommentReferenceManyField target="photo_id" addLabel={false} />
      </Tab>
    </TabbedShowLayout>
  </Show>
);

/** Photo create view */
export const PhotoCreate = props => (
  <Create {...props}>
    <SimpleForm>
      <AlbumReferenceInput source="album_id" />
      <TextInput source="title" />
      <TextInput source="url" />
      <DateTimeInput source="date" />
      <TextInput source="description" />
    </SimpleForm>
  </Create>
);

/** Photo edit view */
export const PhotoEdit = props => (
  <Edit {...props}>
    <TabbedForm>
      <FormTab label="Summary">
        <DisabledInput source="id" />
        <AlbumReferenceInput source="album_id" />
        <TextInput source="title" />
        <TextInput source="url" />
        <DateTimeInput source="date" />
        <TextInput source="description" />
      </FormTab>
      <FormTab label="Comments" path="comments">
        <CreateRelatedButton target="photo_id" related="comments" />
        <CommentReferenceManyField target="photo_id" addLabel={false} />
      </FormTab>
    </TabbedForm>
  </Edit>
);
