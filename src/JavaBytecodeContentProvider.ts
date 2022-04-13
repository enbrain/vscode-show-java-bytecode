import * as child_process from 'child_process';
import * as vscode from 'vscode';
import Module = require('module');

const JAVA_EXECUTABLE = 'java';

export default abstract class JavaBytecodeContentProvider implements vscode.TextDocumentContentProvider {
    constructor(readonly dumperUri: vscode.Uri) {
    }

    provideTextDocumentContent(uri: vscode.Uri, token: vscode.CancellationToken): vscode.ProviderResult<string> {
        return new Promise((resolve, reject) => {
            const args = ['-jar', this.dumperUri.fsPath, ...this.getArgs(uri)];

            const process = child_process.execFile(JAVA_EXECUTABLE, args);

            let stderr = '';
            let stdout = '';

            process.stdout?.on('data', chunk => {
                stdout += chunk.toString();
            });

            process.stderr?.on('data', chunk => {
                stderr += chunk.toString();
            });

            process.on('close', code => {
                if (code === 0) {
                    const header = `// Disassembled with Show Java Bytecode\n//   ${[JAVA_EXECUTABLE, ...args].join(' ')}\n`;
                    resolve(header + '\n' + stdout);
                } else {
                    resolve("Failed to disassemble!\nstderr: " + stderr);
                }
            });

            process.on('error', error => {
                resolve(error.message);
            });
        });
    }

    abstract getArgs(uri: vscode.Uri): string[];
}
