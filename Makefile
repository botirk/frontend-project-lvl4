install: install-deps

build:
	npm run build

lint:
	npx eslint . --ext js,jsx

lint+fix:
	npx eslint . --ext js,jsx --fix

test:
	npm test -s
