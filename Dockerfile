FROM ruby:3.1.2-slim

RUN apt-get update -qq && apt-get install -yq --no-install-recommends \
  build-essential \
  gnupg2 \
  git \
  libmariadb-dev \
  sqlite3 \
  libsqlite3-dev \
  libpq-dev \
  postgresql-client \
  && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*



ENV LANG=C.UTF-8 \
  BUNDLE_JOBS=4 \
  BUNDLE_RETRY=3

WORKDIR /usr/src/app
COPY Gemfile /Gemfile
COPY Gemfile.lock /Gemfile.lock

RUN gem update --system && gem install bundler && bundle install

COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["sh", "/usr/bin/entrypoint.sh"]

EXPOSE 3000

CMD ["bundle", "exec", "rails", "s", "-b", "0.0.0.0"]
