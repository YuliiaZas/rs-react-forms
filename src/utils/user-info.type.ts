import { AppForm } from './form-schema.const';

export type UserInfo = Omit<AppForm, 'file'> & { file: string };
