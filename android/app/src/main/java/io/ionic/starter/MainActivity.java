package io.zadroit.reachonexpress;

import android.os.Bundle;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;
import android.graphics.Color;

import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        Window window = getWindow();

        // Remove edge-to-edge
        window.clearFlags(WindowManager.LayoutParams.FLAG_LAYOUT_NO_LIMITS);
        window.getDecorView().setSystemUiVisibility(View.SYSTEM_UI_FLAG_VISIBLE);

        // Set your custom color (hex)
        window.setStatusBarColor(Color.parseColor("#1f3b54")); // Example: Deep Orange
        window.setNavigationBarColor(Color.parseColor("#1f3b54")); // Example: Dark Blue Grey
    }
}
