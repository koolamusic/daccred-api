const certs = {
  index: '/cred',
  create: '/cred/new',
  editor: '/cred/[id]/editor',
  recipients: '/cred/[id]/recipients',
  forms: '/cred/[id]/forms',
  preview: '/cred/[id]/preview',
};

const open = {
  index: '/public',
  forms: '/public/forms/[id]',
  claim: '/public/claim/[id]',
};

export const routes = {
  certs,
  open,
};

export default routes;
