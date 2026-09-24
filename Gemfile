source 'https://rubygems.org'

# Bundle edge Rails instead: gem "rails", github: "rails/rails", branch: "main"
gem 'rails', '~> 7.2.3', '>= 7.2.3.2'
# Pinned: json 3.x dropped the `quirks_mode` keyword that Rails 7.2's request
# parser still passes to JSON.parse, causing every JSON request body to 500.
gem 'json', '~> 2.7'
# Use postgresql as the database for Active Record
gem 'pg', '~> 1.1'
# Use the Puma web server [https://github.com/puma/puma]
gem 'puma', '>= 5.0'
# Build JSON APIs with ease [https://github.com/rails/jbuilder]
# gem "jbuilder"
# Use Redis adapter to run Action Cable in production
# gem "redis", ">= 4.0.1"

# Use Kredis to get higher-level data types in Redis [https://github.com/rails/kredis]
# gem "kredis"

# Use Active Model has_secure_password [https://guides.rubyonrails.org/active_model_basics.html#securepassword]
# gem "bcrypt", "~> 3.1.7"

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: %i[windows jruby]

# Reduces boot times through caching; required in config/boot.rb
gem 'bootsnap', require: false

# Use Active Storage variants [https://guides.rubyonrails.org/active_storage_overview.html#transforming-images]
# gem "image_processing", "~> 1.2"

# Modern asset pipeline — `rails new --api` skips this entirely, but a
# server-rendered app needs it to serve the compiled Tailwind CSS / esbuild JS.
gem 'propshaft'

# Hotwire — SPA-like navigation and interactivity without a separate
# frontend app (same pattern as cadastre-niger).
gem 'stimulus-rails'
gem 'turbo-rails'

# Bundle CSS (TailwindCSS) and JS (esbuild) — same toolchain as cadastre-niger.
gem 'cssbundling-rails'
gem 'jsbundling-rails'

# Load environment variables from .env in development
gem 'dotenv-rails', groups: %i[development test]

# Authentication — sessions for the web UI (Devise default) + JWT for a
# future mobile/API client (same dual pattern as ipay-money-app,
# financial-ipay and i-money-app — see docs/adr/0002-auth-sessions-and-jwt.md).
gem 'devise'
gem 'devise-jwt'

# Authorization — used in 3/3 of the team's real Rails apps (ipay-money-app,
# financial-ipay, i-money-app), always alongside app/policies/.
gem 'pundit'

# Error tracking
gem 'sentry-rails'
gem 'sentry-ruby'

# Structured (JSON) request logs
gem 'lograge'

group :development, :test do
  # See https://guides.rubyonrails.org/debugging_rails_applications.html#debugging-with-the-debug-gem
  gem 'debug', platforms: %i[mri windows], require: 'debug/prelude'

  # Static analysis for security vulnerabilities [https://brakemanscanner.org/]
  gem 'brakeman', require: false

  # Audits Gemfile.lock for gems with known vulnerabilities
  gem 'bundler-audit', require: false

  # Rubocop, with a reasonable (not overly strict) rule set
  gem 'rubocop', require: false
  gem 'rubocop-rails', require: false
  gem 'rubocop-rspec', require: false

  # Testing framework
  gem 'factory_bot_rails'
  gem 'rspec-rails'

  # Code coverage — see spec/spec_helper.rb for the SimpleCov setup
  gem 'simplecov', require: false
end

group :test do
  gem 'shoulda-matchers'
end
