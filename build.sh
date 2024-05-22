#!/bin/bash -e

rm -rf "build"

cp -r "./src" "./build"

mkdir -p "build-cache"

# Generate stdlib documentation
if [ ! -d "build-cache/gerap_doc_proj" ]; then
    cd "build-cache"
    gerap new "gerap_doc_proj"
    cd ..
fi
cd "build-cache/gerap_doc_proj"
gerap doc std
cd ../..
cp -r "build-cache/gerap_doc_proj/.gerap/docs" "./build/docs"

# Get Bytecoder if not present
if [ ! -f "build-cache/bytecoder.jar" ]; then
    curl "https://repo.maven.apache.org/maven2/de/mirkosertic/bytecoder/bytecoder-cli/2024-05-10/bytecoder-cli-2024-05-10-executable.jar" \
        -o "build-cache/bytecoder.jar"
fi
if [ ! -f "build-cache/bytecoder-api.jar" ]; then
    curl "https://repo.maven.apache.org/maven2/de/mirkosertic/bytecoder/bytecoder.api/2024-05-10/bytecoder.api-2024-05-10.jar" \
        -o "build-cache/bytecoder-api.jar"
fi

# Compile gerac if not present
if [ ! -f "build-cache/gerac.jar" ]; then
    rm -rf build-cache/gerac-gh
    git clone "https://github.com/geralang/gerac" "build-cache/gerac-gh"
    cd "build-cache/gerac-gh"
    make
    cd ../..
    cp "build-cache/gerac-gh/gerac.jar" "build-cache/gerac.jar"
fi

# Compile WebCompiler if not present
if [ ! -d "build-cache/webc-out" ]; then
    mkdir -p "build-cache/webc-out"
    javac \
        -cp "build-cache/gerac.jar:build-cache/bytecoder-api.jar" \
        $(find "compiler/src" -name "*.java") \
        -d "build-cache/webc-out"
fi

# Compile gerac to Javascript if not present
rm -rf "build-cache/bytecoder-in"
mkdir "build-cache/bytecoder-in"
cp -r "build-cache/webc-out/." "build-cache/bytecoder-in"
cd "build-cache/bytecoder-in"
jar -xvf "../gerac.jar"
java -jar "../bytecoder.jar" compile js \
    -classpath=. \
    -mainclass=typesafeschwalbe.gerac.web.WebCompiler \
    -builddirectory=..
cd ../..

exit 0

rm -rf std-gh
git clone https://github.com/geralang/std std-gh
cp -r std-gh/src ./build/playground/std-gera/
cp -r std-gh/src-js ./build/playground/std-js/
cd build/playground
find std-gera -type f \( -iname \*.gera -o -iname \*.gem \) > std-sources-gera.txt
find std-js -name "*.js" > std-sources-js.txt
cd ../..
rm -rf std-gh