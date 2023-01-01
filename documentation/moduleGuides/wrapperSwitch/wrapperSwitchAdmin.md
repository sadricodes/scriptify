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

## Add switch items to the post template

- ### Adding the name switch
- ### Adding the avatar switch
- ### Adding a new switch element

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
