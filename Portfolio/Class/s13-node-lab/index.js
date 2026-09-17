// index.js - Student Starter Skeleton
// TODO 1: Import built-in Node modules (os, fs/promises, path
import os from 'os'; //import is part of the isexe standard
// const os = requiere('os'); //hold the whole reference in the tag, a way of allowing third party libraries into our code
// TODO 2: Import third-party NPM packages (chalk)
import chalk from 'chalk';
import fs from 'fs-extra';

async function generateTelemetryReport() {
    console.log("Initializing Node.js Telemetry Engine...");

    try {
        // ==========================================
        // 1. HARVEST SYSTEM TELEMETRY (Built-in 'os' module)
        // ==========================================
        // TODO: Get CPU architecture, platform, free memory (in MB), and system uptime (in hours)
        const platform = os.platform();
        const freeMemMB = (os.freemem() / (1024 * 1024)).toFixed(0); // zero decimals //binary system, a byte is 8bits if you chain them its 1024
        const totalMemMB = (os.totalmem() / (1024 * 1024)).toFixed(0);
        const usedMemMB = ((os.totalmem() - os.freemem()) / (1024 * 1024)).toFixed(0);
        const uptimeHours = (os.uptime() / 3600).toFixed(2);
        const cpuModel = os.cpus()[0].model; 

        // ==========================================
        // 2. RENDER FORMATTED TERMINAL LOGS (Third-Party 'chalk')
        // ==========================================
        // TODO: Print a colorful status report to the terminal using chalk colors
        console.log("==========================================");
        console.log("         SYSTEM & ENV TELEMETRY           ");
        console.log("==========================================");
        // Print Platform, Free Memory, and Uptime with custom colors
        console.log(`${chalk.bold("OS Platform:")}               ${chalk.yellow(platform)}`);
        console.log(`${chalk.bold("Free memory (MB):")}          ${chalk.yellow(freeMemMB)}`);
        console.log(`${chalk.bold("Used Memory (MB):")}          ${chalk.red(usedMemMB)}`);
        console.log(`${chalk.bold("Total Memory (MB):")}         ${chalk.blue(totalMemMB)}`);
        console.log(`${chalk.bold("System Uptime (hours):")}     ${chalk.cyan(uptimeHours)}`);
        console.log(`${chalk.bold("CPU Model:")}                 ${chalk.magenta(cpuModel)}`);



        // ==========================================
        // 3. WRITE PERMANENT LOG FILE (Built-in 'fs/promises')
        // ==========================================
        const logEntry = `[${new Date().toISOString()}] PLATFORM: ${platform} | FREEMEM: ${freeMemMB}MB`;
        
        // TODO: Append logEntry to 'telemetry.log' using fs.appendFile()
        console.log("Writing log entry to disk...");
        
        await fs.appendFile('telemetry.log', logEntry, 'utf8'); // fs-extra handles file creation automatically if 'telemetry.log' doesn't exist yet
                            //path, data, encoding
        console.log("Telemetry audit completed successfully!");

    } catch (error) {
        console.error("Telemetry report generation failed:", error.message);
    }
}

// Execute engine
generateTelemetryReport();
