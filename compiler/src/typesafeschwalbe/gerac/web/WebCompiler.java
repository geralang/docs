
package typesafeschwalbe.gerac.web;

import java.util.HashMap;

import org.teavm.jso.*;

import typesafeschwalbe.gerac.compiler.Compiler;
import typesafeschwalbe.gerac.compiler.Result;
import typesafeschwalbe.gerac.compiler.Target;
import typesafeschwalbe.gerac.compiler.Error;

public class WebCompiler {
    
    public interface CompilerOutput extends JSObject {
        boolean successful();
        String value();
    }

    public interface CompilerCallback extends JSObject {
        CompilerOutput compile(
            String[] fileNames, String[] fileContents, String main
        );
    }

    @JSBody(params = { "callback" }, script = "gerac = callback;")
    public static native boolean setCompilerCallback(CompilerCallback callback);

    public static void main(String[] args) {
        WebCompiler.setCompilerCallback(new CompilerCallback() {
            @Override
            public CompilerOutput compile(
                String[] fileNames, String[] fileContents, String main
            ) {
                final HashMap<String, String> files = new HashMap<>();
                for(int fileI = 0; fileI < fileNames.length; fileI += 1) {
                    files.put(fileNames[fileI], fileContents[fileI]);
                }
                Result<Compiler.Output> result = Compiler.compile(
                    files, Target.JAVASCRIPT, main, false
                );
                final String value;
                if(result.isValue()) {
                    value = result.getValue().code();
                } else {
                    StringBuilder disp = new StringBuilder();
                    for(Error err: result.getError()) {
                        disp.append(err.render(files, true));
                    }
                    value = disp.toString();
                }
                return new CompilerOutput() {
                    @Override
                    public boolean successful() {
                        return result.isValue();
                    }

                    @Override
                    public String value() {
                        return value;
                    }
                };
            }
        });
    }

}
