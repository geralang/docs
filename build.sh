#!/bin/bash -e

# remove previous output
rm -rf output

# clone compiler and stdlib
git clone https://github.com/geralang/gerac gerac
git clone https://github.com/geralang/std std

# compile compiler to webassembly binary
cd gerac-js
wasm-pack build --target web
cd ..

# copy everything into a new output directory
cp src output -r
cp gerac-js/pkg output/pkg -r
cp std output/std -r
cd output/std/src
find . -name '*.gera' -o -name '*.gem' > ../../std_gera_files.txt
cd ..
cd src-js
find . -name '*.js' > ../../std_js_files.txt
cd ../../..

# remove cloned repos
rm -rf gerac
rm -rf std