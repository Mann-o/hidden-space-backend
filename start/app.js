'use strict'

const { join } = require('path')

const aceProviders = [
  '@adonisjs/lucid/providers/MigrationsProvider',
  'adonis-acl/providers/CommandsProvider',
  'adonis-cache/providers/CommandsProvider',
]

const aliases = {
  BaseModel: 'App/Models/BaseModel',
  Cache: 'Adonis/Addons/Cache',
  CustomHelpers: 'App/Helpers',
  Image: 'App/Models/Image',
  JsonSerializer: 'App/Models/Serializers/JsonSerializer',
  Permission: 'Adonis/Acl/Permission',
  Post: 'App/Models/Post',
  Role: 'Adonis/Acl/Role',
  Space: 'App/Models/Space',
  Therapist: 'App/Models/Therapist',
  User: 'App/Models/User',
}

const commands = [
  'App/Commands/Api/Down',
  'App/Commands/Api/Up',
  'App/Commands/Cache/Clear',
]

const providers = [
  '@adonisjs/framework/providers/AppProvider',
  '@adonisjs/auth/providers/AuthProvider',
  '@adonisjs/bodyparser/providers/BodyParserProvider',
  '@adonisjs/cors/providers/CorsProvider',
  '@adonisjs/lucid/providers/LucidProvider',
  '@adonisjs/mail/providers/MailProvider',
  '@adonisjs/redis/providers/RedisProvider',
  '@adonisjs/session/providers/SessionProvider',
  '@adonisjs/shield/providers/ShieldProvider',
  '@adonisjs/validator/providers/ValidatorProvider',
  '@adonisjs/framework/providers/ViewProvider',
  '@adonisjs/drive/providers/DriveProvider',
  'adonis-acl/providers/AclProvider',
  'adonis-bundler/providers/BundlerProvider',
  'adonis-cache/providers/CacheProvider',
  'adonis-kraken/providers/KrakenProvider',
  join(__dirname, '..', 'app/Providers/InlineMailer/InlineMailerProvider'),
]

module.exports = {
  aceProviders,
  aliases,
  commands,
  providers,
}
