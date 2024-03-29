/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { IUser, TSignOut } from "./api/auth";
import { IArticle } from "./api/articles";
import { IAPIErrors } from "./api/utils";
import { MatchResults, RouterHistory } from "@stencil/router";
import { IComment } from "./api/comments";
import { TTabTypes } from "./components/types";
import { IProfile } from "./api/profiles";
export { IUser, TSignOut } from "./api/auth";
export { IArticle } from "./api/articles";
export { IAPIErrors } from "./api/utils";
export { MatchResults, RouterHistory } from "@stencil/router";
export { IComment } from "./api/comments";
export { TTabTypes } from "./components/types";
export { IProfile } from "./api/profiles";
export namespace Components {
    interface AppFooter {
    }
    interface AppHeader {
        "signOut": TSignOut;
        "user"?: IUser;
    }
    interface AppRoot {
    }
    interface ArticleList {
        "errors": IAPIErrors;
        "listedArticles": IArticle[];
        "user"?: IUser;
    }
    interface ArticleMeta {
        "article": IArticle;
        "followFavorite": (isFollow: boolean) => void;
        "history": RouterHistory;
        "user"?: IUser;
    }
    interface ArticlePage {
        "history": RouterHistory;
        "match": MatchResults;
        "user"?: IUser;
    }
    interface AuthPage {
        "match": MatchResults;
        "setUser": (user: IUser) => void;
    }
    interface CommentForm {
        "addComment": (comment: IComment) => void;
        "slug": string;
        "user": IUser;
    }
    interface EditorPage {
        "history": RouterHistory;
        "match": MatchResults;
        "user": IUser;
    }
    interface ErrorDisplay {
        "errors"?: IAPIErrors;
    }
    interface HomePage {
        "user"?: IUser;
    }
    interface HomeTags {
        "setTag": (tag: string) => void;
    }
    interface LoadingSpinner {
    }
    interface NotFound {
        "history": RouterHistory;
    }
    interface ProfilePage {
        "match": MatchResults;
        "user"?: IUser;
    }
    interface SettingsPage {
        "setUser": (user: IUser) => void;
        "user": IUser;
    }
    interface SingleComment {
        "comment": IComment;
        "removeComment": (id: number) => void;
        "slug": string;
        "user": IUser;
    }
    interface TabbedFeed {
        "activeTag"?: string;
        "clearTag"?: () => void;
        "isProfile"?: boolean;
        "possibleTabs": TTabTypes[];
        "profile"?: IProfile;
        "user"?: IUser;
    }
}
declare global {
    interface HTMLAppFooterElement extends Components.AppFooter, HTMLStencilElement {
    }
    var HTMLAppFooterElement: {
        prototype: HTMLAppFooterElement;
        new (): HTMLAppFooterElement;
    };
    interface HTMLAppHeaderElement extends Components.AppHeader, HTMLStencilElement {
    }
    var HTMLAppHeaderElement: {
        prototype: HTMLAppHeaderElement;
        new (): HTMLAppHeaderElement;
    };
    interface HTMLAppRootElement extends Components.AppRoot, HTMLStencilElement {
    }
    var HTMLAppRootElement: {
        prototype: HTMLAppRootElement;
        new (): HTMLAppRootElement;
    };
    interface HTMLArticleListElement extends Components.ArticleList, HTMLStencilElement {
    }
    var HTMLArticleListElement: {
        prototype: HTMLArticleListElement;
        new (): HTMLArticleListElement;
    };
    interface HTMLArticleMetaElement extends Components.ArticleMeta, HTMLStencilElement {
    }
    var HTMLArticleMetaElement: {
        prototype: HTMLArticleMetaElement;
        new (): HTMLArticleMetaElement;
    };
    interface HTMLArticlePageElement extends Components.ArticlePage, HTMLStencilElement {
    }
    var HTMLArticlePageElement: {
        prototype: HTMLArticlePageElement;
        new (): HTMLArticlePageElement;
    };
    interface HTMLAuthPageElement extends Components.AuthPage, HTMLStencilElement {
    }
    var HTMLAuthPageElement: {
        prototype: HTMLAuthPageElement;
        new (): HTMLAuthPageElement;
    };
    interface HTMLCommentFormElement extends Components.CommentForm, HTMLStencilElement {
    }
    var HTMLCommentFormElement: {
        prototype: HTMLCommentFormElement;
        new (): HTMLCommentFormElement;
    };
    interface HTMLEditorPageElement extends Components.EditorPage, HTMLStencilElement {
    }
    var HTMLEditorPageElement: {
        prototype: HTMLEditorPageElement;
        new (): HTMLEditorPageElement;
    };
    interface HTMLErrorDisplayElement extends Components.ErrorDisplay, HTMLStencilElement {
    }
    var HTMLErrorDisplayElement: {
        prototype: HTMLErrorDisplayElement;
        new (): HTMLErrorDisplayElement;
    };
    interface HTMLHomePageElement extends Components.HomePage, HTMLStencilElement {
    }
    var HTMLHomePageElement: {
        prototype: HTMLHomePageElement;
        new (): HTMLHomePageElement;
    };
    interface HTMLHomeTagsElement extends Components.HomeTags, HTMLStencilElement {
    }
    var HTMLHomeTagsElement: {
        prototype: HTMLHomeTagsElement;
        new (): HTMLHomeTagsElement;
    };
    interface HTMLLoadingSpinnerElement extends Components.LoadingSpinner, HTMLStencilElement {
    }
    var HTMLLoadingSpinnerElement: {
        prototype: HTMLLoadingSpinnerElement;
        new (): HTMLLoadingSpinnerElement;
    };
    interface HTMLNotFoundElement extends Components.NotFound, HTMLStencilElement {
    }
    var HTMLNotFoundElement: {
        prototype: HTMLNotFoundElement;
        new (): HTMLNotFoundElement;
    };
    interface HTMLProfilePageElement extends Components.ProfilePage, HTMLStencilElement {
    }
    var HTMLProfilePageElement: {
        prototype: HTMLProfilePageElement;
        new (): HTMLProfilePageElement;
    };
    interface HTMLSettingsPageElement extends Components.SettingsPage, HTMLStencilElement {
    }
    var HTMLSettingsPageElement: {
        prototype: HTMLSettingsPageElement;
        new (): HTMLSettingsPageElement;
    };
    interface HTMLSingleCommentElement extends Components.SingleComment, HTMLStencilElement {
    }
    var HTMLSingleCommentElement: {
        prototype: HTMLSingleCommentElement;
        new (): HTMLSingleCommentElement;
    };
    interface HTMLTabbedFeedElement extends Components.TabbedFeed, HTMLStencilElement {
    }
    var HTMLTabbedFeedElement: {
        prototype: HTMLTabbedFeedElement;
        new (): HTMLTabbedFeedElement;
    };
    interface HTMLElementTagNameMap {
        "app-footer": HTMLAppFooterElement;
        "app-header": HTMLAppHeaderElement;
        "app-root": HTMLAppRootElement;
        "article-list": HTMLArticleListElement;
        "article-meta": HTMLArticleMetaElement;
        "article-page": HTMLArticlePageElement;
        "auth-page": HTMLAuthPageElement;
        "comment-form": HTMLCommentFormElement;
        "editor-page": HTMLEditorPageElement;
        "error-display": HTMLErrorDisplayElement;
        "home-page": HTMLHomePageElement;
        "home-tags": HTMLHomeTagsElement;
        "loading-spinner": HTMLLoadingSpinnerElement;
        "not-found": HTMLNotFoundElement;
        "profile-page": HTMLProfilePageElement;
        "settings-page": HTMLSettingsPageElement;
        "single-comment": HTMLSingleCommentElement;
        "tabbed-feed": HTMLTabbedFeedElement;
    }
}
declare namespace LocalJSX {
    interface AppFooter {
    }
    interface AppHeader {
        "signOut"?: TSignOut;
        "user"?: IUser;
    }
    interface AppRoot {
    }
    interface ArticleList {
        "errors"?: IAPIErrors;
        "listedArticles"?: IArticle[];
        "user"?: IUser;
    }
    interface ArticleMeta {
        "article"?: IArticle;
        "followFavorite"?: (isFollow: boolean) => void;
        "history"?: RouterHistory;
        "user"?: IUser;
    }
    interface ArticlePage {
        "history"?: RouterHistory;
        "match"?: MatchResults;
        "user"?: IUser;
    }
    interface AuthPage {
        "match"?: MatchResults;
        "setUser"?: (user: IUser) => void;
    }
    interface CommentForm {
        "addComment"?: (comment: IComment) => void;
        "slug"?: string;
        "user"?: IUser;
    }
    interface EditorPage {
        "history"?: RouterHistory;
        "match"?: MatchResults;
        "user"?: IUser;
    }
    interface ErrorDisplay {
        "errors"?: IAPIErrors;
    }
    interface HomePage {
        "user"?: IUser;
    }
    interface HomeTags {
        "setTag"?: (tag: string) => void;
    }
    interface LoadingSpinner {
    }
    interface NotFound {
        "history"?: RouterHistory;
    }
    interface ProfilePage {
        "match"?: MatchResults;
        "user"?: IUser;
    }
    interface SettingsPage {
        "setUser"?: (user: IUser) => void;
        "user"?: IUser;
    }
    interface SingleComment {
        "comment"?: IComment;
        "removeComment"?: (id: number) => void;
        "slug"?: string;
        "user"?: IUser;
    }
    interface TabbedFeed {
        "activeTag"?: string;
        "clearTag"?: () => void;
        "isProfile"?: boolean;
        "possibleTabs"?: TTabTypes[];
        "profile"?: IProfile;
        "user"?: IUser;
    }
    interface IntrinsicElements {
        "app-footer": AppFooter;
        "app-header": AppHeader;
        "app-root": AppRoot;
        "article-list": ArticleList;
        "article-meta": ArticleMeta;
        "article-page": ArticlePage;
        "auth-page": AuthPage;
        "comment-form": CommentForm;
        "editor-page": EditorPage;
        "error-display": ErrorDisplay;
        "home-page": HomePage;
        "home-tags": HomeTags;
        "loading-spinner": LoadingSpinner;
        "not-found": NotFound;
        "profile-page": ProfilePage;
        "settings-page": SettingsPage;
        "single-comment": SingleComment;
        "tabbed-feed": TabbedFeed;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "app-footer": LocalJSX.AppFooter & JSXBase.HTMLAttributes<HTMLAppFooterElement>;
            "app-header": LocalJSX.AppHeader & JSXBase.HTMLAttributes<HTMLAppHeaderElement>;
            "app-root": LocalJSX.AppRoot & JSXBase.HTMLAttributes<HTMLAppRootElement>;
            "article-list": LocalJSX.ArticleList & JSXBase.HTMLAttributes<HTMLArticleListElement>;
            "article-meta": LocalJSX.ArticleMeta & JSXBase.HTMLAttributes<HTMLArticleMetaElement>;
            "article-page": LocalJSX.ArticlePage & JSXBase.HTMLAttributes<HTMLArticlePageElement>;
            "auth-page": LocalJSX.AuthPage & JSXBase.HTMLAttributes<HTMLAuthPageElement>;
            "comment-form": LocalJSX.CommentForm & JSXBase.HTMLAttributes<HTMLCommentFormElement>;
            "editor-page": LocalJSX.EditorPage & JSXBase.HTMLAttributes<HTMLEditorPageElement>;
            "error-display": LocalJSX.ErrorDisplay & JSXBase.HTMLAttributes<HTMLErrorDisplayElement>;
            "home-page": LocalJSX.HomePage & JSXBase.HTMLAttributes<HTMLHomePageElement>;
            "home-tags": LocalJSX.HomeTags & JSXBase.HTMLAttributes<HTMLHomeTagsElement>;
            "loading-spinner": LocalJSX.LoadingSpinner & JSXBase.HTMLAttributes<HTMLLoadingSpinnerElement>;
            "not-found": LocalJSX.NotFound & JSXBase.HTMLAttributes<HTMLNotFoundElement>;
            "profile-page": LocalJSX.ProfilePage & JSXBase.HTMLAttributes<HTMLProfilePageElement>;
            "settings-page": LocalJSX.SettingsPage & JSXBase.HTMLAttributes<HTMLSettingsPageElement>;
            "single-comment": LocalJSX.SingleComment & JSXBase.HTMLAttributes<HTMLSingleCommentElement>;
            "tabbed-feed": LocalJSX.TabbedFeed & JSXBase.HTMLAttributes<HTMLTabbedFeedElement>;
        }
    }
}
