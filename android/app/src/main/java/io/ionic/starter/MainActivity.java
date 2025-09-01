package io.zadroit.reachonexpress;

import android.os.Bundle;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;

import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;
import androidx.core.view.WindowInsetsCompat.Type;
import androidx.core.view.WindowInsetsControllerCompat;

import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        Window window = getWindow();

        // Remove edge-to-edge
        window.clearFlags(WindowManager.LayoutParams.FLAG_LAYOUT_NO_LIMITS);
        window.getDecorView().setSystemUiVisibility(View.SYSTEM_UI_FLAG_VISIBLE);

        // ✅ Handle window insets (status bar, nav bar, keyboard)
        View rootView = window.getDecorView();

        ViewCompat.setOnApplyWindowInsetsListener(rootView, (view, insets) -> {
            WindowInsetsCompat windowInsets = insets;

            // Get system bar insets (status, nav, notch)
            int left = windowInsets.getInsets(Type.systemBars() | Type.displayCutout()).left;
            int top = windowInsets.getInsets(Type.systemBars() | Type.displayCutout()).top;
            int right = windowInsets.getInsets(Type.systemBars() | Type.displayCutout()).right;
            int bottom = windowInsets.getInsets(Type.systemBars() | Type.displayCutout()).bottom;

            // Handle IME (keyboard) visibility
            boolean imeVisible = windowInsets.isVisible(Type.ime());
            int imeHeight = windowInsets.getInsets(Type.ime()).bottom;

            // Apply padding to avoid overlap
            view.setPadding(
                    left,
                    top,
                    right,
                    imeVisible ? imeHeight : bottom
            );

            return insets;
        });
    }
}
