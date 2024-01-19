import { api } from 'boot/axios';

import helpers from 'helpers/index';

import { useAuthStore } from 'stores/auth';
import { useAuthorizationsStore } from 'stores/authorizations';
import { useMessagesStore } from 'stores/messages';

const { MergeObject } = helpers;

const { authenticate, setUser } = useAuthStore();
const { setAuthorizations } = useAuthorizationsStore();
const { setMessage } = useMessagesStore();
export default {
  async login(credentials) {
    try {
      const response = await api.post('/provisioning/credentials', credentials);
      const { data, status, ...rest } = response;
      const {
        authorizations, mail, name, project, project_id, role,
      } = data;
      const icons = {
        'ACD Management': 'share',
        'IVR Management': 'app_registration',
        MailConnectors: 'mail',
        'Messaging Server': 'question_answer',
        Provisioning: 'extension',
        SCP: 'hub',
      };
      const applications = helpers.removeDuplicates(authorizations
        .filter(({ read }) => read)
        .sort((a, b) => {
          if (
            a.application_id > b.application_id
            && a.resource_order > b.resource_order
          ) {
            return 1;
          }

          if (
            a.application_id === b.application_id
            && a.resource_order > b.resource_order
          ) {
            return 1;
          }

          if (
            a.application_id < b.application_id
            && a.resource_order < b.resource_order
          ) {
            return -1;
          }

          if (
            a.application_id === b.application_id
            && a.resource_order < b.resource_order
          ) {
            return -1;
          }

          return 0;
        })
        .map(({ application }) => application))
        .map((application, index) => ({
          id: index,
          name: application,
          link: `/applications/${application.replace(/\s/g, '-').toLowerCase()}`,
          icon: icons[application],
        }));

      const resources = authorizations
        .filter(({ read }) => read)
        .sort((a, b) => {
          if (
            a.application_id > b.application_id
            && a.resource_order > b.resource_order
          ) {
            return 1;
          }

          if (
            a.application_id === b.application_id
            && a.resource_order > b.resource_order
          ) {
            return 1;
          }

          if (
            a.application_id < b.application_id
            && a.resource_order < b.resource_order
          ) {
            return -1;
          }

          if (
            a.application_id === b.application_id
            && a.resource_order < b.resource_order
          ) {
            return -1;
          }

          return 0;
        })
        .map((item) => ({
          [item.application]: {
            [item.resource]: MergeObject(Object.keys(item).filter(
              (key) => key !== 'application'
                && key !== 'application_id' && key !== 'plan_id'
                && key !== 'project_id' && key !== 'resource' && key !== 'role',
            )
              .map((key) => ({
                [key]: ['create', 'delete', 'read', 'update'].indexOf(key) !== -1
                  ? item[key] === 1
                  : item[key],
              }))),
          },
        }))
        .reduce((a, v) => {
          const application = Object.keys(v)[0];
          return ({ ...a, [application]: { ...a[application], ...v[application] } });
        });

      /* const applications = authorizations
        .filter(({ read }) => read)
        .sort((a, b) => {
          if (
            a.application_id > b.application_id
            && a.resource_order > b.resource_order
          ) {
            return 1;
          }

          if (
            a.application_id === b.application_id
            && a.resource_order > b.resource_order
          ) {
            return 1;
          }

          if (
            a.application_id < b.application_id
            && a.resource_order < b.resource_order
          ) {
            return -1;
          }

          if (
            a.application_id === b.application_id
            && a.resource_order < b.resource_order
          ) {
            return -1;
          }

          return 0;
        })
        .map((item) => ({
          [item.application]: {
            [item.resource]: MergeObject(Object.keys(item).filter(
              (key) => key !== 'application'
              && key !== 'application_id' && key !== 'plan_id'
              && key !== 'project_id' && key !== 'resource' && key !== 'role',
            )
              .map((key) => ({
                [key]: ['create', 'delete', 'read', 'update'].indexOf(key) !== -1
                  ? item[key] === 1
                  : item[key],
              }))),
          },
        }))
        .reduce((a, v) => {
          const application = Object.keys(v)[0];
          return ({ ...a, [application]: { ...a[application], ...v[application] } });
        }); */

      setAuthorizations({
        applications, authorizations: resources, project, project_id,
      });
      // console.log('rest: ', rest);
      // console.log(response);
      // TODO: Store to redis
      // localStorage.setItem('user', JSON.stringify({ mail, name, role }));
      /* localStorage.setItem(
        'permissions',
        JSON.stringify({ authorizations, project, project_id }),
      ); */
      setUser({ mail, name, role });
      setMessage({
        code: rest.statusText,
        message: 'Operation successful',
        status,
      });
      authenticate();

      return data;
    } catch (error) {
      // console.log('error: ', error);
      const data = {
        code: error.code,
        message: error.response.data.reason,
        status: error.response.status,
      };
      setMessage(data);
      return error;
    }
  },
  logout() {
    authenticate();
    // TODO: delete from redis
    // localStorage.removeItem('permissions');
    // localStorage.removeItem('user');
  },
};
