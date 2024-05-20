
let gerac = null;

main();

function gerac_compile(files) {
    const fileNames = [];
    const fileContents = [];
    for(const fileName in files) {
        fileNames.push(fileName);
        fileContents.push(files[fileName]);
    }
    const output = gerac_callback(fileNames, fileContents);
    console.log(output);
}