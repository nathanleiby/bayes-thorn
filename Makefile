SHELL := /bin/bash
.PHONY: test deps lint format

all: test

# converts ipython notebook to python file
notebook_to_file:
	ipython nbconvert --to python thorn-exploration.ipynb

# install python requirements
deps:
	pip install -r requirements-dev.txt

# lint python files via pep8
lint: deps
	pep8 --config ./pep8 . || true

# automatically format python files via autopep8
format: deps
	autopep8 -i -r -j0 -a --experimental --max-line-length 100 --indent-size 4 .

# run python tests
test: deps
	python -m unittest discover
