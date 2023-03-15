/* eslint-disable security/detect-object-injection */
const { getUser } = require('../utils/context');
const { CustomApolloError, CustomForbiddenError } = require('../utils/error-handler');
const { getMessage } = require('../utils/messages');

const isRequestingUserAlsoOwner = ({
  ctx, userId, type, typeId,
}) => ctx.db.exists[type]({ id: typeId, user: { id: userId } });

const directiveResolvers = {
  isAuthenticated: async (next, source, args, ctx) => {
    const user = await getUser(ctx.req, ctx.res, ctx.models.user);
    if (!user) {
      throw new CustomApolloError(getMessage('USER_NOT_FOUND'));
    }
    ctx.req.user = user;
    return next();
  },
  hasRole: async (next, source, { roles }, ctx) => {
    const user = await getUser(ctx.req, ctx.res, ctx.models.user);
    if (!user) {
      throw new CustomApolloError(getMessage('USER_NOT_FOUND'));
    }

    if (roles.some(role => role.includes(...user.roles))
      || user.roles.some(role => role.includes(...roles))) {
      ctx.req.user = user;
      return next();
    }
    throw new CustomForbiddenError(getMessage('INCORRECT_ROLE'));
  },
  isOwner: async (next, source, { type }, ctx) => {
    let typeId = null;

    if (source && source.id) {
      typeId = source.id;
    } else {
      typeId = ctx.req.body.variables.id;
    }
    const user = await getUser(ctx.req, ctx.res, ctx.models.user);
    if (!user) {
      throw new CustomApolloError(getMessage('USER_NOT_FOUND'));
    }
    const isOwner = type === 'User'
      ? user.id === typeId
      : await isRequestingUserAlsoOwner({
        ctx, userId: user.id, type, typeId,
      });
    if (isOwner) {
      return next();
    }
    throw new CustomForbiddenError(getMessage('NOT_OWNER'));
  },
  isOwnerOrHasRole: async (next, source, { roles, type }, ctx) => {
    const user = await getUser(ctx.req, ctx.res, ctx.models.user);
    if (roles.includes(user.role)) {
      return next();
    }

    const { id: typeId } = ctx.request.body.variables;
    const isOwner = await isRequestingUserAlsoOwner({
      ctx,
      userId: user.id,
      type,
      typeId,
    });

    if (isOwner) {
      return next();
    }
    throw new CustomForbiddenError(getMessage('NOT_OWNER_INCORRECT_ROLE'));
  },
};

module.exports = { directiveResolvers };
