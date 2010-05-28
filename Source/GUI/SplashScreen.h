#ifndef SPLASH__HEADER
#define SPLASH__HEADER

#include <stdafx.h>

#include <MyGUI.h>


class SplashScreen
{

public:

    SplashScreen();

    bool Init();

    ~SplashScreen();

private:

    void ExitPressed(MyGUI::WidgetPtr SourceWidget);
    void NewPressed(MyGUI::WidgetPtr SourceWidget);

    MyGUI::Widget* PanelWidgit;
    MyGUI::StaticImage* LogoImage;

};

#endif  // GUI__HEADER