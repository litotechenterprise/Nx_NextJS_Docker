# Install dependencies only when needed
FROM docker.io/node:lts-alpine as dependencies

RUN apk add --no-cache libc6-compat
WORKDIR /usr/src/app
RUN npm install -g pnpm
COPY package.json pnpm-lock.yaml ./
RUN pnpm install
RUN pnpm add @native-base/next-adapter next-compose-plugins next-transpile-modules native-base @react-stately/combobox @react-stately/radio @react-aria/visually-hidden @react-native-aria/checkbox @react-native-aria/button @react-native-aria/combobox @react-native-aria/focus @react-native-aria/interactions @react-native-aria/listbox @react-native-aria/overlays  @react-native-aria/radio @react-native-aria/slider @react-native-aria/tabs @react-native-aria/utils normalize-css-color
# Production image, copy all the files and run next
FROM docker.io/node:lts-alpine as runner
RUN apk add --no-cache dumb-init

ENV NODE_ENV production
ENV PORT 3000
ENV HOST 0.0.0.0
ENV NEXT_TELEMETRY_DISABLED 1

WORKDIR /usr/src/app

# Copy installed dependencies from dependencies stage
COPY --from=dependencies /usr/src/app/node_modules ./node_modules

# Copy built application files
COPY ./ ./

# Run the application under "node" user by default
RUN chown -R node:node .
USER node
EXPOSE 3000

# If you are using the custom server implementation:
#CMD ["dumb-init", "node", "server/main.js"]

# If you are using the NextJS built-int server:
CMD ["dumb-init", "npm", "start"]