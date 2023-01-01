# Wrapper Switch for Administrators

Welcome to the Wrapper Switch guide for administrators! In this document, we will cover how to set up your post view for Wrapper Switch items, how to add and delete items, how to add and delete NPC characters, and how the permissions systems work.

This guide assumes that you have successfully installed the base codes and created configuration pages described in the [Installation](../../installing.md) documentation, and enabled/configured the Wrapper Switch plugin as described in the [Admin Guide](../../adminguide.md).

## Configuring Post Templates to use Wrapper Switch

- ### Add the data attribute to your whole post container

  - #### Find the Post Row HTML template to edit

    In your JCink Admin CP, click "Manage Skin Sets" to view a list of skins available on your forum.

    ![List of skins available in Jcink Admin CP](../../doc_images/skinsList.png)

    Click the 'HTML Templates' link for the skin you would like to modify.

    This will take you to the list of available HTML templates.

    ![List of HTML templates](../../doc_images/htmlTemps.png)

    In the example, we will be working with the "Jcink Forum Hosting Default".

    > > > When first installed, the Jcink Forum Hosting default skin does not have a set of templates assigned. If you would like to begin from this theme, you can create and allocate a set of templates as described in the [Jcink HTML Templates Documentation](https://jcink.com/main/wiki/jfh-html-templates). The code to use and edit for each template can be found on the [Default Templates](https://jcink.com/main/wiki/jfh-skinning-default-templates#category_list_header) page.

    Find the "Post Row" entry in the list of HTML templates, and click "Edit" to view the code.

    ![Post Row template in edit mode](../../doc_images/postrowEdit1.png)

    > > > If you don't see any code here, it may be because the theme is using default template code. Copy and paste the default template code from the [Default Templates](https://jcink.com/main/wiki/jfh-skinning-default-templates#category_list_header) page

  - #### Find the outermost container of your post template

    This is the HTML element that wraps around as much of the code as possible. This will be different from skin to skin, and if your theme has multiple post row display templates that are hidden/shown via CSS, there may be more than one. If you need help finding the element you're looking for, RP communities that have coding help available are the best place to seek help.

    In the case of the default Post Row template, the outermost container is a `<span>` element. It's the element closest to the top that is not closed (there is no nearby `</span>` tag associated with it, the closing tag can be found at the very bottom of the code)

  - #### Place the attribute in the opening tag of that container

    In the opening tag of that outermost container, add the following HTML attribute:

    `switch-data-item="post"`

    Sometimes these can be hard to read (especially if they have Jcink variables contained in them, like the example we're using), so it may be easiest to locate the end `>` for that tag and place the attribute code just before that.

    ![Attribute code added to post container](../../doc_images/addAttributePost.png)

  - #### Save the HTML template

    Click the 'Save Changes' button to save your changes. A message will appear above the button with the time the template was successfully saved.

- ### Add the data attribute to your post text container

  - #### Open the "Post Row" HTML template to edit

    As described in the first step, locate and open the "Post Row" template for the skin you would like to modify.

  - #### Find the container that wraps around the post text

    This can be tricky to identify, especially in custom skins.

    Look for the `<!-- |post| -->` Jcink variable located in the template. This is where the post text will be loaded.

    Now, have a look at the HTML element that comes directly before it. If that element opens before that variable, and closes after it - that's likely the one you're looking for! Again, Jcink RP community coders can be a great help in finding the correct post container element.

    In the default template, the post container element looks like this:

    ![Post Row code with container element highlighted](../../doc_images/postContainerDiv.png)

  - #### Add the Post Text attribute to this container

    Similar to how you did with the outermost container, place this attribute into the post container element's opening tag:

    `switch-data-item="postText"`

    The updated code for the default example looks like this:

    ![Post Row template with attribute added to post text container](../../doc_images/postTextAttAdd.png)

  - #### Save the HTML template

    Click the 'Save Changes' button to save your changes. A message will appear above the button with the time the template was successfully saved.

Congratulations! Your post template is now set up and ready to add your switch elements!

## Add switch items to the post template

Now that we have the post container set up, we can start adding elements that we want to be switched using the code. Character names and avatars are two common elements, but this guide will also cover how to add generic text and image elements of your choice.

- ### Adding the name switch

  - #### Open up the Post Row HTML template for editing

    Detailed steps for this can be found above if you need them.

    The Post Row template usually contains the name of the account that is posting, so we need to tell the Wrapper Switch code where to find what it needs to switch out.

  - #### Locate the account name variable in the template

    The Jcink Post Row variable for the account name is `<!-- |name| -->`, and it's usually surrounded by a few other variables like the prefix and suffix, as well as the name_css.

    In the default template, it looks like this:

    ![Post Row Template code with name variable highlighted](../../doc_images/nameCodeLine.png)

    It looks a bit confusing, so let's add some line breaks and indents to make it easier to read:

    ![Post Row template with name code formatted](../../doc_images/nameLineFormatted.png)

    This is the same code as before -- just with a bit of formatting. If you're using a custom theme with a custom post row template, the code will be very different to this, but it will always contain that name variable.

  - #### Get the name attribute code from your Admin Configuration Page

    In another tab, load your Admin Configuration page. If you have the Wrapper Switch module enabled (see the [Admin Guide](../../adminguide.md) page for help enabling/disabling plugins), you will see settings tabs for the Wrapper Switch plugin in the left-hand sidebar.

    Select the "Input Settings" tab

    ![Admin Configuration page viewing the Input Settings tab](../../doc_images/inputSettings.png)

    Here you can see a list of all the available inputs you have configured.

    Underneath the 'Character Name' heading, you can see a code box. Click the 'Copy Code' button to the right of this box to easily copy the code to your clipboard, or highlight and copy with your normal preferred method if your browser doesn't allow script copying.

    If a message confirming that the code was successfully copied to your clipboard appears, you're good to go!

  - #### Add the attribute code to the element that contains the name variable

    Go back to where you were editing the Post Row template in your Admin CP.

    Find the element that wraps around the name variable. In the default theme, it's a span element.

    Add the attribute code we copied above to the end of that element's opening tag.

    ![Post Row template html with name added to containing element](../../doc_images/nameAttAdd.png)

  - #### Save the Post Row template - that's done!

    Save the template, and have a stretch. Well done!

    You can test whether the switch is working by making a post and filling out the 'name' field in the post screen. When you view the post, it should change to the name you selected in the post screen.

    If not, check:

    - That the Wrapper Switch system is enabled
    - That the correct attributes have been added to the post row container, and the post text container (see above for instructions) - remember to check for typos!
    - That the name attribute has been inserted into the right place, and doesn't contain typos.

- ### Adding the avatar switch
- ### Adding a new text switch element
- ### Adding a new image switch element

## General Wrapper Switch settings

## Wrapper Switch system permissions

## Wrapper Switch Language Settings

## Wrapper Switch Input Settings

- ### Creating a new input
- ### Editing an existing input
- ### Deleting an input

## Wrapper Switch NPC Settings

- ### Creating a new NPC
- ### Editing an existing NPC
- ### NPC permissions
- ### Deleting an NPC

## Menu

- [Documentation Index](../../../README.md)
- [Module List](../../moduleList.md)
- [Wrapper Switch User Guide](../wrapperSwitch/wrapperSwitchUser.md)
