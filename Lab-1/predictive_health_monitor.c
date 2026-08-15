#include <stdio.h>

int main() {
    // --- PART A: VARIABLE DECLARATIONS & STORAGE INITIALIZATION ---
    int assetID = 101;
    int operatingHours = 0;
    float coreTemp = 0.0;
    float vibrationHz = 0.0;
    float oilPressure = 0.0;
    
    // Control variables for loops and menus
    int menuChoice = 0;
    int runStatusFlag = 1; // 1 keeps terminal runtime alive
    char operatorInitials[5] = "SYS";
    
    // Diagnostic calculation output registers
    float baseStressIndex = 0.0;
    float hazardIndex = 0.0;
    int anomalyCount = 0;

    // Bitwise system tracking configuration flag (Binary representation of sub-systems)
    // Bit 0: Console Logs, Bit 1: Desktop Push Notification Alerts, Bit 2: Haptic Vibration Trigger
    unsigned char notificationSystemConfig = 0x01; // 00000001 (Console Logs turned ON by default)

    printf("===============================================================\n");
    printf("     FLEETSTREAM: PREDICTIVE ASSET HEALTH CONTROL CONSOLE      \n");
    printf("       Target Scope: Catastrophic Breakdown Prevention         \n");
    printf("===============================================================\n");

    // --- IMPLEMENTING LOOPS: DO-WHILE MENU ENGINE ---
    // Rule: This ensures the operations console loads at least once for user interaction.
    do {
        printf("\n--- REAL-TIME MAIN TRACKING COMMAND CENTRE ---\n");
        printf("1. Ingest Core Telemetry & Run Diagnostic Triage\n");
        printf("2. Simulate 5-Step Continuous High-Stress Engine Cycle\n");
        printf("3. Configure Alert Notification Flags (Bitwise Toggles)\n");
        printf("4. Shutdown Ingestion Console System\n");
        printf("Enter operational choice code (1-4): ");
        scanf("%d", &menuChoice);

        // --- IMPLEMENTING BRANCHING: SWITCH-CASE ROUTING MAP ---
        switch(menuChoice) {

            case 1:
                printf("\n--- ACTION: INGESTING INSTANTANEOUS SENSOR TELEMETRY ---\n");
                printf("Enter Unique Asset Track ID (Integer Number): ");
                scanf("%d", &assetID);
                printf("Enter Accumulated Machine Operating Hours: ");
                scanf("%d", &operatingHours);
                printf("Enter Internal Engine Core Temperature (Celsius): ");
                scanf("%f", &coreTemp);
                printf("Enter Structural Vibration Amplitude Frequency (Hz): ");
                scanf("%f", &vibrationHz);
                printf("Enter Hydraulic Oil Feed Line Pressure (PSI): ");
                scanf("%f", &oilPressure);

                // 1. Simple Validation Using standard 'if' statement
                // Validates data limits to prevent erroneous processing.
                if (assetID <= 0 || operatingHours < 0 || coreTemp < -50.0 || vibrationHz < 0.0 || oilPressure < 0.0) {
                    printf("[ERROR]: Telemetry data corrupted or invalid! Dropping packet calculation cycle.\n");
                    break; // Exits Case 1 back out to the main menu loop
                }

                // 2. Arithmetic Operators Usage
                // Computes a weighted mechanical stress index from physical variables.
                baseStressIndex = (vibrationHz * 0.45f) + (coreTemp * 0.55f);

                printf("\n--- DIAGNOSTIC DATA TRIAGE REPORT ---\n");
                printf("Base Calculated Engine Strain Coefficient: %.2f\n", baseStressIndex);

                // 3. Relational and Logical Operators via an If-Else If Ladder
                // Checks for specific sensor intersections to identify an imminent failure state.
                if ((vibrationHz > 120.50f) || (coreTemp > 105.00f)) {
                    printf("CRITICAL EXCEPTION ALERT: Severe out-of-bounds anomaly identified!\n");
                    printf("Risk Assessment: STATUS RED - HIGH CATASTROPHIC BREAKDOWN HAZARD.\n");
                    anomalyCount++;
                } 
                else if ((vibrationHz >= 85.00f) && (oilPressure < 30.00f)) {
                    printf("MAINTENANCE WARNING: Mild structural drift matching wear profile signatures.\n");
                    printf("Risk Assessment: STATUS YELLOW - HIGH PROGRESSIVE DEGRADATION LEVEL.\n");
                } 
                else if (!(oilPressure >= 15.00f)) { // Using Logical NOT Operator
                    printf("CRITICAL EXCEPTION ALERT: Total system oil starvation detected!\n");
                    anomalyCount++;
                }
                else {
                    printf("Risk Assessment: STATUS GREEN - ASSET OPERATING IN OPTIMAL STABILITY ENVELOPE.\n");
                }

                // 4. Shorthand Assignment Operators
                // Automatically adjusts the raw risk footprint based on engine age scaling factors.
                if (operatingHours > 8000) {
                    printf("Age Factor adjustment applied: Heavy-duty usage profile overhead calculated (+15.25 Stress Points).\n");
                    baseStressIndex += 15.25f; // Compound addition shorthand assignment operator
                }

                // 5. Special Operators: Ternary/Conditional Operator
                // Triggers emergency sensor priority flags if breakdown indicators spike.
                hazardIndex = (baseStressIndex > 90.0f) ? 99.99f : (baseStressIndex + 2.50f);
                printf("Normalized Component Hazard Score Matrix Output: %.2f / 100.00\n", hazardIndex);

                // 6. Special Operators: Sizeof Operator Demo
                printf("[Internal Telemetry Metrics Frame Profile Metadata Allocation Footprint: %lu Bytes]\n", sizeof(baseStressIndex));
                break;

            case 2:
                printf("\n--- ACTION: INITIATING 5-STEP CONTINUOUS STRESS SIMULATION ENGINE ---\n");
                printf("Simulating live sensor feedback over the next sequential phase cycles...\n");

                float runningSimTemp = 80.0f;
                int currentSimulationStep = 1;

                // --- IMPLEMENTING LOOPS: FOR LOOP WITH COUNTED STEPS ---
                // Simulates a time-series telemetry loop tracking temperature changes.
                for (currentSimulationStep = 1; currentSimulationStep <= 5; currentSimulationStep++) {
                    
                    // Increment and Decrement Operators (Pre & Post variations)
                    runningSimTemp += 6.50f; // Rapid engine temperature increase sequence
                    printf(" -> Step %d: Core Heat Sensor Tracked at [%.2f C]...", currentSimulationStep, runningSimTemp);

                    // Jumping/Loop Control: Using Continue
                    // Skips a processing loop block if an extreme out-of-bounds data spike is caught.
                    if (runningSimTemp >= 98.0f && runningSimTemp < 100.0f) {
                        printf(" [CRITICAL HEAT SPIKE DETECTED - FORCED COOLING PULSE SHUNT TRIGGERED - SKIPPING MATRIX STEP]\n");
                        runningSimTemp -= 4.0f; // Cool down via shunt simulation
                        continue; // Bypasses subsequent statements inside loop frame, skips to next increment step
                    }

                    // Jumping/Loop Control: Using Break
                    // Terminate loop processing immediately if temperature limits exceed maximum safety margins.
                    if (runningSimTemp >= 110.0f) {
                        printf("\n[THERMAL RUNAWAY CRITICAL BREACH]: Simulation aborted instantly via emergency shutdown bypass!\n");
                        break; // Completely breaks out of the execution timeline
                    }
                    
                    printf(" Status: Logged Successfully.\n");
                }
                break;

            case 3:
                printf("\n--- ACTION: CONFIGURE ALERT NOTIFICATION PACKET FLAGS ---\n");
                printf("Current Raw System Configuration Register Byte Value: %d\n", notificationSystemConfig);
                
                int subMenuChoice = 0;
                printf("1. Enable Desktop Push Alert Systems (Bitwise OR Operator Toggle)\n");
                printf("2. Restrict to Local Console System Logs Only (Bitwise AND Mask Reset)\n");
                printf("Enter tracking configuration command code (1-2): ");
                scanf("%d", &subMenuChoice);

                // Bitwise Operations Applied to Internal Alert Packet Registers
                if (subMenuChoice == 1) {
                    notificationSystemConfig = notificationSystemConfig | 0x02; // Bitwise OR: Turns on Bit 1 (00000011)
                    printf("Success. Desktop Push System Alerts Activated. Updated Config Value: %d\n", notificationSystemConfig);
                } 
                else if (subMenuChoice == 2) {
                    notificationSystemConfig = notificationSystemConfig & 0x01; // Bitwise AND: Masks out everything except Bit 0 (00000001)
                    printf("Success. Push networks offline. Restricted to standard logs. Updated Config Value: %d\n", notificationSystemConfig);
                } 
                else {
                    printf("Invalid input configuration code choice.\n");
                }
                break;

            case 4:
                printf("\nShutting down pipeline telemetry servers... Control Station Console Offline.\n");
                // --- IMPLEMENTING LOOPS: WHILE LOOP CONDITION VARIABLE MANIPULATION ---
                runStatusFlag = 0; // Toggles core status condition to break enclosing runtime loop frame execution
                break;

            default:
                printf("\n[ERROR ALERT]: Invalid system choice selector code! Enter an option from 1 to 4.\n");
        }

    } while (runStatusFlag != 0); // While loop evaluator condition controlling system core execution lifespan

    return 0;
}